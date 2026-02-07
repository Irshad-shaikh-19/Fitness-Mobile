import { Play, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const mockDownloads = [
  {
    id: "1",
    title: "Yoga Session",
    size: "0.92 GB",
    thumbnail: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400&h=300&fit=crop&q=80",
    badge: "Recently added"
  },
  {
    id: "2",
    title: "HIIT Workout",
    size: "1.2 GB",
    thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop&q=80",
  },
];

interface DeleteMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  position: { top: number; right: number };
}

function DeleteMenu({ isOpen, onClose, onDelete, position }: DeleteMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div
        className="fixed z-50 bg-gray-800 rounded-lg shadow-xl min-w-[200px]"
        style={{ top: `${position.top}px`, right: `${position.right}px` }}
      >
        <button
          onClick={() => {
            onDelete();
            onClose();
          }}
          className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-gray-700 rounded-lg transition"
        >
          <Trash2 className="w-5 h-5" />
          <span>Delete Download</span>
        </button>
      </div>
    </>
  );
}

export default function DownloadsPage() {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });

  const handleMenuClick = (e: React.MouseEvent, downloadId: string) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom + 5,
      right: window.innerWidth - rect.right
    });
    setOpenMenuId(openMenuId === downloadId ? null : downloadId);
  };

  const handleDelete = (id: string) => {
    console.log("Delete download:", id);
  };

  const handleVideoClick = (id: string) => {
    navigate(`/workout/${id}`);
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24 pt-4">
 

      {/* Downloads List */}
      <div className="px-4 py-4 space-y-4">
        {mockDownloads.map((download) => (
          <div
            key={download.id}
            className="flex items-center gap-3 cursor-pointer"
          >
            {/* Thumbnail with Play Button */}
            <div onClick={() => handleVideoClick(download.id)}
               className="relative w-40 h-24 flex-shrink-0 rounded overflow-hidden bg-gray-800">
              <img
                src={download.thumbnail}
                alt={download.title}
                className="w-full h-full object-cover"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="w-12 h-12 rounded-full bg-black/70 border-2 border-white flex items-center justify-center">
                  <Play className="w-6 h-6 text-white fill-white ml-1" />
                </div>
              </div>

              {/* Badge */}
              {download.badge && (
                <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 text-center">
                  {download.badge}
                </div>
              )}

              {/* Top 10 Badge */}
              <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-bl">
                TOP<br/>10
              </div>
            </div>

            {/* Title and Size */}
            <div className="flex-1">
              <h3 className="text-white text-base font-medium mb-1">
                {download.title}
              </h3>
              <p className="text-gray-400 text-sm">{download.size}</p>
            </div>

            {/* More Menu Button */}
            <button
              onClick={(e) => handleMenuClick(e, download.id)}
              className="text-white p-2"
            >
              <MoreVertical className="w-6 h-6" />
            </button>

            {/* Delete Menu */}
            <DeleteMenu
              isOpen={openMenuId === download.id}
              onClose={() => setOpenMenuId(null)}
              onDelete={() => handleDelete(download.id)}
              position={menuPosition}
            />
          </div>
        ))}
      </div>

    

      {/* Find More Button */}
      <div className="px-4  pt-20">
        <button
          onClick={() => navigate("/home")}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-md transition"
        >
          Find More to Download
        </button>
      </div>
    </div>
  );
}