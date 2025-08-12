// import { useState } from "react";
// import { createCustomShortUrl } from "../api/shortUrl.api"; // Make sure you have this API
// import { useSelector } from "react-redux";
// import { RootState } from "../store/store";

// export default function CustomUrl() {
//   const [url, setUrl] = useState("");
//   const [slug, setSlug] = useState("");
//   const [shortUrl, setShortUrl] = useState("");
//   const { user } = useSelector((state: RootState) => state.auth);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await createCustomShortUrl({ url, slug });
//       setShortUrl(res.data.shortUrl);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-xl font-bold mb-4">Create Custom Short URL</h1>
//       {user && (
//         <p className="text-sm text-gray-500 mb-4">
//           Logged in as <strong>{user.name}</strong> ({user.email})
//         </p>
//       )}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="url"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           placeholder="Enter full URL"
//           required
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           value={slug}
//           onChange={(e) => setSlug(e.target.value)}
//           placeholder="Custom slug (optional)"
//           className="w-full p-2 border rounded"
//         />
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//           Create
//         </button>
//       </form>

//       {shortUrl && (
//         <p className="mt-4">
//           Short URL:{" "}
//           <a href={shortUrl} className="text-blue-500 underline">
//             {shortUrl}
//           </a>
//         </p>
//       )}
//     </div>
//   );
// }

export const CustomUrl = () => {
  return (
     <>
       <div>
         <h1>CustomUrl Page </h1>
       </div>
     </> 
  )
}