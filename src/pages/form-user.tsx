import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../components/form/input";
import { CostumerModel } from "../models/costumer";
import { NumericFormat } from "react-number-format";
import FormApp from "../components/form-app";

const FormUser = () => {
  const navigate = useNavigate();
  const { handleSubmit, control: costumerFormControl } =
    useForm<CostumerModel>();

  const onSubmit = (data: CostumerModel) => {
    console.log(data);
  };

  return (
    <div
      style={{ backgroundImage: "url('/effect-2.png')" }}
      className={
        location.pathname.includes("form")
          ? "absolute pb-16 right-0 top-0 py-6 px-4  transition-all bg-cover duration-300 w-full h-screen overflow-y-scroll bg-white bg-no-repeat"
          : "absolute pb-16 right-[-100%] py-6 px-4 transition-all bg-cover duration-300 top-0 w-full h-screen overflow-y-scroll bg-white bg-no-repeat"
      }
    >
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
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
        {/* <button className="flex items-center space-x-2 rounded-full bg-green-500 text-white px-4 py-2 shadow-lg border border-white hover:bg-green-600">
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
        </button> */}
      </div>
      <div className="bg-white shadow-lg rounded-lg p-4 mt-5 border border-green-200">
        <p className="font-bold text-xl text-green-900 text-center my-4">
          Isi Data Nasabah
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Controller
            name="name"
            control={costumerFormControl}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                label="Nama Nasabah"
                placeholder="Masukan Nama Nasabah"
              />
            )}
          />
          <Controller
            name="bankName"
            control={costumerFormControl}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                label="Nama Bank"
                placeholder="Nama Bank"
              />
            )}
          />
          <Controller
            name="accountNumber"
            control={costumerFormControl}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                label="Nomor Rekening"
                placeholder="Nomor Rekening"
              />
            )}
          />
          <Controller
            name="amount"
            control={costumerFormControl}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <>
                <label
                  className="font-semibold text-neutral-600"
                  htmlFor={"amount"}
                >
                  Jumlah Pencairan
                </label>
                <NumericFormat
                  name="amount"
                  thousandSeparator={true}
                  allowNegative={false}
                  value={value}
                  onValueChange={(e) =>
                    onChange(e.floatValue ? e.floatValue : 0)
                  }
                  placeholder={"Masukkan Jumlah"}
                  prefix="Rp. "
                  className="w-full outline-none border -mt-3 focus:bg-green-50 focus:border-green-200 border-gray-300 rounded-lg p-3"
                />
              </>
            )}
          />
          <Controller
            name="startAt"
            control={costumerFormControl}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                label="Tanggal Mulai"
                placeholder={"Tanggal Mulai"}
                type={"date"}
              />
            )}
          />
          <Controller
            name="endAt"
            control={costumerFormControl}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                label="Tanggal Berakhir"
                placeholder={"Tanggal Berakhir"}
                type={"date"}
              />
            )}
          />
          <button className="uppercase w-full py-3 text-lg my-4 rounded-full bg-green-500 text-white hover:bg-green-600 text-center font-semibold">
            SUbmit
          </button>
        </form>
      </div>

      <FormApp />
    </div>
  );
};

export default FormUser;
