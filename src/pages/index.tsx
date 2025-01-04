import { useNavigate } from "react-router-dom";
import Info from "./info";
import FormUser from "./form-user";
import { useEffect, useState } from "react";
import { AppModel } from "../models/costumer";
import Service from "../utils/data-service";

const data = [
  {
    icon: "https://static.vecteezy.com/system/resources/previews/022/188/209/non_2x/realistic-plus-icon-free-png.png",
    label: "Pengajuan pinjaman",
    page: "/info",
  },
  {
    icon: "https://i.pinimg.com/originals/37/29/61/3729617452425f23b079bb0de458293a.png",
    label: "Data nasabah",
    page: "/form",
  },
  {
    icon: "https://e7.pngegg.com/pngimages/930/741/png-clipart-round-green-check-mark-illustration-check-mark-bottle-material-green-tick-miscellaneous-angle.png",
    label: "Data pembayaran",
    page: "/",
  },
  {
    icon: "https://www.freeiconspng.com/thumbs/office-icon/office-icon--insharepics-11.png",
    label: "Kantor cabang",
    page: "/",
  },
];

const User = () => {
  const [app, setApp] = useState<AppModel | null>(null);
  const navigate = useNavigate();
  const service = new Service();

  useEffect(() => {
    const app = service.find<AppModel>("app");
    setApp(app);
  }, []);

  return (
    <>
      <div
        style={{ backgroundImage: "url('/effect.png')" }}
        className="w-full h-full bg-white flex flex-col bg-cover bg-center bg-no-repeat items-center justify-between p-6"
      >
        <div className="w-full max-w-sm text-center">
          <div className="flex items-center justify-center gap-3">
            <img
              src="https://w7.pngwing.com/pngs/37/158/png-transparent-koperasi-sari-bhakti-ministry-of-cooperatives-and-small-and-medium-enterprises-of-the-republic-of-indonesia-logo-business-indonesia-people-signage-indonesia.png" // Ganti dengan logo Anda
              alt="Logo"
              className="w-16 rounded-full h-16"
            />
            <div className="text-start">
              <h1 className="text-xl ubuntu-bold text-green-800">
                {app?.name}
              </h1>
              <p className="ubuntu-semibold text-neutral-500">
                Aplikasi khusus admin
              </p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm space-y-4">
          {(data || []).map((item, idx) => (
            <button
              onClick={() => {
                navigate(item.page);
              }}
              key={idx}
              className="active:opacity-40 transition duration-300 ease-in-out flex items-center p-4 w-full border border-green-400 rounded-xl gap-4 hover:bg-green-100"
            >
              <img
                src={item.icon}
                className="w-[60px] object-cover h-[60px] rounded-full"
                alt=""
              />
              <span className="text-green-800 ubuntu-semibold text-xl">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center flex text-sm gap-3">
          <p>By</p>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Bankindonesialogo.svg/2560px-Bankindonesialogo.svg.png" // Ganti dengan logo Bank Indonesia
            alt="Bank Indonesia"
            className="w-32 mx-auto"
          />
        </div>
      </div>

      <Info />
      <FormUser />
    </>
  );
};

export default User;
