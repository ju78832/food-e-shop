import { CldImage } from "next-cloudinary";
import toast from "react-hot-toast";

export default function EditableImage({ link, setLink }) {
  async function handleFileChange(ev) {
    const files = ev.target.files[0];
    if (!files) return;
    try {
      const data = new FormData();
      data.append("file", files);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      toast.success("Successfully Image Uploaded!", "image");

      const res_data = await response.json();
      setLink(res_data.publicId);
    } catch (error) {
      toast.error("Error Occured");
      throw new error(error);
    }
  }

  return (
    <>
      {link && (
        <CldImage
          className="rounded-lg w-full h-full mb-1"
          src={link}
          width={250}
          height={250}
          alt={"avatar"}
        />
      )}
      {!link && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
          Change image
        </span>
      </label>
    </>
  );
}
