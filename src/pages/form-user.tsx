import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../components/form/input";
import { CostumerModel } from "../models/costumer";
import { NumericFormat } from "react-number-format";
import FormApp from "../components/form-app";
import moment from "moment";
import calculateMonthlyInstallment from "../utils/calc";
import Service from "../utils/data-service";
import { useModal } from "../components/modal/use-modal";
import { useEffect, useState } from "react";
import Modal from "../components/modal/Modal";

const FormUser = () => {
  const [periodes, setperiodes] = useState<number[]>([]);
  const service = new Service();
  const navigate = useNavigate();
  const modalMonth = useModal({});

  const {
    handleSubmit,
    control: costumerFormControl,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CostumerModel>();

  const { handleSubmit: handleSubmitPeriode, control: periodeFormControl } =
    useForm<{ periode: string }>();

  const onSubmit = (data: CostumerModel) => {
    const now = moment(data.paymentDate);
    setValue("paymentDate", `${now.date()}`);
    setValue("startAt", now.format("DD/MM/YYYY"));
    setValue("endAt", now.add(data.duration, "month").format("DD/MM/YYYY"));

    setTimeout(() => {
      service.store<CostumerModel>("costumer", { ...watch() });
      window.location.href = "/info";
    }, 500);
  };

  console.log(watch());

  const checkInstallment = (data: CostumerModel) => {
    const monthlyInstallment = calculateMonthlyInstallment(
      data.amount,
      0.5,
      Number(data.duration)
    );
    setValue("installment", monthlyInstallment);
  };

  const onSubmitPeriode = (data: { periode: string }) => {
    const periodes = service.find<number[]>("periodes");
    service.store("periodes", [...periodes, Number(data.periode)]);
    setTimeout(() => {
      setperiodes(service.find<number[]>("periodes"));
      modalMonth.control.close();
    }, 500);
  };

  useEffect(() => {
    const periodes = service.find<number[]>("periodes");
    console.log(periodes);
    setperiodes(periodes);
  }, []);

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
          onClick={() => navigate("/")}
          className="flex items-center ubuntu-bold hover:bg-gray-100/50 space-x-2 px-4 py-2 rounded"
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
          <span className="ubuntu-bold">Nasabah Baru</span>
        </button> */}
      </div>
      <div className="bg-white shadow-lg rounded-lg p-4 mt-5 border border-green-200">
        <p className="ubuntu-bold text-xl text-green-900 text-center my-4">
          Isi Data Nasabah
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Controller
            name="name"
            control={costumerFormControl}
            rules={{ required: "Nama Nasabah harus diisi" }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                label="Nama Nasabah"
                placeholder="Masukan Nama Nasabah"
              />
            )}
          />
          {errors.name?.message && (
            <p className="text-sm text-red-500 -mt-3">{errors.name.message}</p>
          )}
          <Controller
            name="bankName"
            control={costumerFormControl}
            rules={{ required: "Nama Bank harus diisi" }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                label="Nama Bank"
                placeholder="Nama Bank"
              />
            )}
          />
          {errors.bankName?.message && (
            <p className="text-sm text-red-500 -mt-3">
              {errors.bankName.message}
            </p>
          )}
          <Controller
            name="accountNumber"
            control={costumerFormControl}
            rules={{ required: "Nomor Rekening harus diisi" }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                label="Nomor Rekening"
                placeholder="Nomor Rekening"
                type="numeric"
              />
            )}
          />
          {errors.accountNumber?.message && (
            <p className="text-sm text-red-500 -mt-3">
              {errors.accountNumber.message}
            </p>
          )}
          <Controller
            name="amount"
            control={costumerFormControl}
            rules={{ required: "Jumlah harus diisi" }}
            render={({ field: { onChange, value } }) => (
              <>
                <label
                  className="ubuntu-semibold text-neutral-600"
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
          {errors.amount?.message && (
            <p className="text-sm text-red-500 -mt-3">
              {errors.amount.message}
            </p>
          )}
          {/* <Controller
            name="paymentDate"
            control={costumerFormControl}
            rules={{ required: "Tanggal Pembayaran harus diisi" }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                label="Tanggal Pembayaran"
                placeholder="Tanggal Pembayaran"
              />
            )}
          />
          {errors.paymentDate?.message && (
            <p className="text-sm text-red-500 -mt-3">
              {errors.paymentDate.message}
            </p>
          )} */}
          <Controller
            name="paymentDate"
            control={costumerFormControl}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                label="Tanggal Pembayaran"
                placeholder={"Tanggal Pembayaran"}
                type={"date"}
              />
            )}
          />
          {/* <Controller
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
          /> */}

          <label className="ubuntu-semibold text-neutral-600">
            Jangka Waktu
          </label>
          <div className="grid grid-cols-2 gap-4">
            {(periodes?.sort((a, b) => a - b) || []).map((item, idx) => (
              <Controller
                key={idx}
                control={costumerFormControl}
                name="duration"
                rules={{ required: "Jangka Waktu harus diisi" }}
                render={({ field: { onChange, value } }) => (
                  <button
                    type="button"
                    onClick={() => onChange(item)}
                    className={`active:opacity-40 transition duration-300 ease-in-out rounded-xl flex-col text-xl text-center ubuntu-semibold gap-2 cursor-pointer hover:border-green-500 hover:shadow-md text-neutral-600 px-4 py-3 hover:bg-green-50 ${
                      value === item
                        ? "shadow-md bg-green-50 border border-green-500"
                        : "border border-neutral-300"
                    }`}
                  >
                    <div>{item}</div>
                    <div>Bulan</div>
                  </button>
                )}
              />
            ))}
            <button
              type="button"
              onClick={() => modalMonth.control.open()}
              className={
                "active:opacity-40 transition duration-300 ease-in-out rounded-xl flex-col text-xl text-center ubuntu-semibold gap-2 cursor-pointer hover:border-green-500 hover:shadow-md text-neutral-600 px-4 py-3 hover:bg-green-50 border border-neutral-300"
              }
            >
              <div>Tambah +</div>
              <div>Bulan</div>
            </button>
          </div>
          {errors.duration?.message && (
            <p className="text-sm text-red-500 -mt-3">
              {errors.duration.message}
            </p>
          )}

          <div className="rounded-xl col-span-2 text-neutral-600 px-4 py-3 border border-green-500 bg-green-50">
            <p className="ubuntu-semibold text-neutral-600">
              Pembayaran Bulanan:
            </p>
            <h2 className="text-2xl ubuntu-semibold flex gap-2">
              <span className="text-xl">Rp.</span>
              <NumericFormat
                onValueChange={(e) =>
                  setValue("installment", e.floatValue as number)
                }
                thousandSeparator={true}
                allowNegative={false}
                onChange={(e) => console.log(e)}
                value={
                  watch("installment")
                    ? (watch("installment") as number).toFixed(0)
                    : 0
                }
                className="bg-transparent outline-none border border-green-400 p-3 rounded-lg w-full"
              />
            </h2>
          </div>
          <button
            onClick={() => handleSubmit(checkInstallment)()}
            type="button"
            className="active:opacity-40 transition duration-300 ease-in-out uppercase w-full py-3 text-sm mt-4 rounded-full border border-green-500 text-green-500 hover:text-white hover:bg-green-600 text-center ubuntu-semibold"
          >
            cek pembayaran bulanan
          </button>
          <button
            type="submit"
            className="active:opacity-40 transition duration-300 ease-in-out uppercase w-full py-3 text-lg mb-4 rounded-full bg-green-500 text-white hover:bg-green-600 text-center ubuntu-semibold"
          >
            Submit
          </button>
        </form>
      </div>

      <FormApp />

      <Modal title="Tambah Jangka Waktu" control={modalMonth.control}>
        <form onSubmit={handleSubmitPeriode(onSubmitPeriode)}>
          <Controller
            name="periode"
            control={periodeFormControl}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                label="Jangka Waktu"
                placeholder="Contoh: 12"
                type="numeric"
              />
            )}
          />
          <div className="flex justify-between mt-6">
            <button
              onClick={() => modalMonth.control.close()}
              type="button"
              className="active:opacity-40 transition duration-300 ease-in-out uppercase py-1.5 px-2 text-sm rounded-md text-red-500 hover:text-white hover:bg-red-500 border border-red-500 text-center ubuntu-semibold"
            >
              Tutup
            </button>
            <button
              type="submit"
              className="active:opacity-40 transition duration-300 ease-in-out uppercase py-1.5 px-2 text-sm rounded-md bg-green-500 text-white hover:bg-green-600 border border-green-500 text-center ubuntu-semibold"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FormUser;
