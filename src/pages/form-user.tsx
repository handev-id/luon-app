import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../components/form/input";
import { CostumerModel } from "../models/costumer";
import { NumericFormat } from "react-number-format";
import FormApp from "../components/form-app";
import moment from "moment";
import calculateMonthlyInstallment from "../utils/calc";
import { useEffect } from "react";

const FormUser = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control: costumerFormControl,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CostumerModel>();

  const onSubmit = (data: CostumerModel) => {
    const now = moment();
    setValue("startAt", now.format("DD/MM/YYYY"));
    setValue("endAt", now.add(data.duration, "month").format("DD/MM/YYYY"));
  };

  const checkInstallment = (data: CostumerModel) => {
    const monthlyInstallment = calculateMonthlyInstallment(
      data.amount,
      0.5,
      Number(data.duration)
    );
    setValue("installment", monthlyInstallment);
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
                type="number"
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
          {errors.amount?.message && (
            <p className="text-sm text-red-500 -mt-3">
              {errors.amount.message}
            </p>
          )}
          <Controller
            name="paymentDate"
            control={costumerFormControl}
            rules={{ required: "Tanggal Pembayaran harus diisi" }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                label="Tanggal Pembayaran"
                placeholder="Tanggal Pembayaran"
                type="number"
              />
            )}
          />
          {errors.paymentDate?.message && (
            <p className="text-sm text-red-500 -mt-3">
              {errors.paymentDate.message}
            </p>
          )}
          {/* <Controller
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
          /> */}

          <label className="font-semibold text-neutral-600">Jangka Waktu</label>
          <div className="grid grid-cols-2 gap-4">
            {[12, 24, 36, 48, 60].map((item) => (
              <Controller
                control={costumerFormControl}
                name="duration"
                rules={{ required: "Jangka Waktu harus diisi" }}
                render={({ field: { onChange, value } }) => (
                  <div
                    onClick={() => onChange(item)}
                    className={`rounded-xl flex-col text-xl text-center font-semibold gap-2 cursor-pointer hover:border-green-500 hover:shadow-md text-neutral-600 px-4 py-3 hover:bg-green-50 ${
                      value === item
                        ? "shadow-md bg-green-50 border border-green-500"
                        : "border border-neutral-300"
                    }`}
                  >
                    <div>{item}</div>
                    <div>Bulan</div>
                  </div>
                )}
              />
            ))}
          </div>
          {errors.duration?.message && (
            <p className="text-sm text-red-500 -mt-3">
              {errors.duration.message}
            </p>
          )}

          <div className="rounded-xl col-span-2 text-neutral-600 px-4 py-3 border border-green-500 bg-green-50">
            <p className="font-semibold text-neutral-600">
              Pembayaran Bulanan:
            </p>
            <h2 className="text-2xl font-semibold flex gap-2">
              <span className="text-xl">Rp.</span>
              <NumericFormat
                thousandSeparator={true}
                allowNegative={false}
                value={
                  watch("installment")
                    ? (watch("installment") as number).toFixed(0)
                    : 0
                }
                className="bg-transparent outline-none"
                disabled
              />
            </h2>
          </div>
          <button
            onClick={() => handleSubmit(checkInstallment)()}
            type="button"
            className="uppercase w-full py-3 text-sm mt-4 rounded-full border border-green-500 text-green-500 hover:text-white hover:bg-green-600 text-center font-semibold"
          >
            cek pembayaran bulanan
          </button>
          <button
            type="submit"
            className="uppercase w-full py-3 text-lg mb-4 rounded-full bg-green-500 text-white hover:bg-green-600 text-center font-semibold"
          >
            Submit
          </button>
        </form>
      </div>

      <FormApp />
    </div>
  );
};

export default FormUser;
