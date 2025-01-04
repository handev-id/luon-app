import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Service from "../utils/data-service";
import { AppModel } from "../models/costumer";

const Layout = () => {
  const service = new Service();

  useEffect(() => {
    const existingperiodes = service.find<number[]>("periodes");
    const existingAppData = service.find<AppModel>("app");
    if (!existingperiodes) {
      service.store("periodes", [12, 24, 36, 48, 60]);
    }
    if (!existingAppData) {
      service.store<AppModel>("app", {
        name: "KSP DANA RAHAYU",
        warning: {
          title: "PENCAIRAN DANA TIDAK DAPAT DIPROSES",
          description:
            "Nasabah baru wajib mempunyai asuransi jiwa, Pastikan telah mendaftar asuransi jiwa sebelum anda mencoba pencairan pinjaman ini kembali",
        },
        announcement:
          "Kabar Baik! Kini limit pinjaman sudah bertambah, anda sudah bisa mencairkan pinjaman sampai dengan Rp.200.000.000",
      });
    }
  }, []);
  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="w-full relative lg:w-[500px] h-screen overflow-hidden bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
