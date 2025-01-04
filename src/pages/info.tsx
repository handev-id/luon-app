import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { AppModel, CostumerModel } from "../models/costumer";
import Service from "../utils/data-service";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useModal } from "../components/modal/use-modal";
import Modal from "../components/modal/Modal";

const Info = () => {
  const [costumer, setCostumer] = useState<CostumerModel | null>(null);
  const [app, setApp] = useState<AppModel | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const service = new Service();
  const modal = useModal({});

  const onDisburse = () => {
    modal.control.open();
  };

  useEffect(() => {
    const costumer = service.find<CostumerModel>("costumer");
    const app = service.find<AppModel>("app");
    setCostumer(costumer);
    setApp(app);
  }, []);

  return (
    <div
      style={{ backgroundImage: "url('/effect-2.png')" }}
      className={
        location.pathname.includes("info")
          ? "absolute pb-16 right-0 top-0 py-6 px-4  transition-all bg-cover duration-300 w-full h-screen overflow-y-scroll bg-white bg-no-repeat"
          : "absolute pb-16 right-[-100%] py-6 px-4 transition-all bg-cover duration-300 top-0 w-full h-screen overflow-y-scroll bg-white bg-no-repeat"
      }
    >
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="flex items-center font-bold hover:bg-gray-100/50 space-x-2 px-4 py-2 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Kembali</span>
        </button>
        <button
          onClick={() => navigate("/form")}
          className="flex items-center space-x-2 rounded-full bg-green-500 text-white px-4 py-2 shadow-lg border border-white hover:bg-green-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="font-bold">Nasabah Baru</span>
        </button>
      </div>
      <p className="font-bold text-xl text-green-900 text-center my-4">
        Proses Pencairan Pinjaman
      </p>
      <div className="p-4 flex gap-3 rounded-xl border border-green-500">
        <div className="w-[60px] h-[60px] text-white bg-green-500 p-3 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              fill="#ffffff"
              d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
            />
          </svg>
        </div>
        <div className="text-green-900 font-semibold">
          <h2 className="text-xl">Nama: {costumer?.name || "Hendro"}</h2>
          <p>Nomor asuransi: {costumer?.insuranceNumber || ""}</p>
        </div>
      </div>
      <div
        style={{
          backgroundImage: "url('/card.png')",
        }}
        className="p-4 gap-3 bg-green-50 bg-no-repeat bg-right bg-cover shadow-lg my-6 border border-green-500 rounded-xl"
      >
        <div className="flex gap-3 pb-4 border-b-2 border-green-500">
          <div className="w-[60px] h-[60px] text-white bg-green-500 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                fill="#ffffff"
                d="M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160l0 8c0 13.3 10.7 24 24 24l400 0c13.3 0 24-10.7 24-24l0-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224l-64 0 0 196.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512l448 0c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1L448 224l-64 0 0 192-40 0 0-192-64 0 0 192-48 0 0-192-64 0 0 192-40 0 0-192zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
              />
            </svg>
          </div>
          <div className="text-green-900 font-semibold">
            <h2 className="text-xl">{costumer?.name || "Hendro"}</h2>
            <p>
              {costumer?.bankName || "BRI"}{" "}
              {costumer?.accountNumber || "0I374834738"}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <p className="font-semibold text-neutral-600">Jumlah Pencairan:</p>
          <h2 className="text-4xl font-semibold flex gap-2">
            <span className="text-xl">Rp.</span>
            {costumer?.amount.toLocaleString("id-ID") || ""}
          </h2>
        </div>
      </div>
      <div className="mt-4 flex gap-4 p-4 rounded-xl bg-neutral-200">
        <div className="w-10 h-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              fill="#8c8c8c"
              d="M480 32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9L381.7 53c-48 48-113.1 75-181 75l-8.7 0-32 0-96 0c-35.3 0-64 28.7-64 64l0 96c0 35.3 28.7 64 64 64l0 128c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-128 8.7 0c67.9 0 133 27 181 75l43.6 43.6c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-147.6c18.6-8.8 32-32.5 32-60.4s-13.4-51.6-32-60.4L480 32zm-64 76.7L416 240l0 131.3C357.2 317.8 280.5 288 200.7 288l-8.7 0 0-96 8.7 0c79.8 0 156.5-29.8 215.3-83.3z"
            />
          </svg>
        </div>
        <p className="text-neutral-700">{app?.announcement}</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-xl text-neutral-600 px-4 py-3 border border-green-500 bg-green-50">
          <p>Tanggal Pengajuan:</p>
          <h2 className="text-2xl font-semibold flex gap-2">
            {moment(costumer?.startAt).format("DD/MM/YYYY")}
          </h2>
        </div>
        <div className="rounded-xl text-neutral-600 px-4 py-3 border border-green-500 bg-green-50">
          <p>Lama Pinjaman:</p>
          <h2 className="text-2xl font-semibold flex gap-2">
            {costumer?.duration || 12} Bulan
          </h2>
        </div>
        <div className="rounded-xl text-neutral-600 px-4 py-3 border border-green-500 bg-green-50">
          <p>Tanggal Pembayaran:</p>
          <h2 className="text-2xl font-semibold flex gap-2">
            {costumer?.paymentDate || 20}
          </h2>
        </div>
        <div className="rounded-xl text-neutral-600 px-4 py-3 border border-green-500 bg-green-50">
          <p>Tanggal Berakhir:</p>
          <h2 className="text-2xl font-semibold flex gap-2">
            {moment(costumer?.endAt).format("DD/MM/YYYY")}
          </h2>
        </div>
        <div className="rounded-xl col-span-2 text-neutral-600 px-4 py-3 border border-green-500 bg-green-50">
          <p className="font-semibold text-neutral-600">Pembayaran Bulanan:</p>
          <h2 className="text-2xl font-semibold flex gap-2">
            <span className="text-xl">Rp.</span>
            <NumericFormat
              thousandSeparator={true}
              allowNegative={false}
              value={
                costumer?.installment ? costumer.installment.toFixed(0) : 0
              }
              className="bg-transparent outline-none"
              disabled
            />
          </h2>
        </div>
      </div>
      <div className="flex mt-8 mb-2 justify-center">
        <button
          onClick={onDisburse}
          type="button"
          className="text-xl bg-green-500 rounded-full py-3 px-8 hover:bg-green-600 font-semibold text-white text-center"
        >
          CAIRKAN PINJAMAN
        </button>
      </div>

      <Modal title="Pencairan Pinjaman" control={modal.control}>
        <div className="text-lg font-semibold text-neutral-600 text-center mb-3">
          PERHATIAN
        </div>
        <div className="flex flex-col justify-center text-center">
          <div className="text-red-500 font-medium mb-1">
            {app?.warning.title}
          </div>
          <p className="text-sm">{app?.warning.description}</p>
        </div>
        <div className="flex mt-6">
          <button
            onClick={() => modal.control.close()}
            type="button"
            className="active:opacity-40 transition w-full duration-300 ease-in-out uppercase py-1.5 px-2 text-sm rounded-md text-white bg-red-500 text-center font-semibold"
          >
            Kembali
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Info;
