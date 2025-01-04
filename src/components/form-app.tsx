import { AppModel } from "../models/costumer";
import Input from "./form/input";
import { Controller, useForm } from "react-hook-form";
import InputArea from "./form/input-area";
import { useEffect } from "react";
import Service from "../utils/data-service";

const FormApp = () => {
  const service = new Service();
  const {
    control: appFormControl,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AppModel>();

  const onSubmit = (data: AppModel) => {
    service.store<AppModel>("app", data);
    window.location.reload();
  };

  useEffect(() => {
    const appData = service.find<AppModel>("app");
    reset(appData);
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mt-5 border border-green-200">
      <p className="ubuntu-bold text-xl text-green-900 text-center mb-4">
        Isi Data Aplikasi
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Controller
          name="name"
          control={appFormControl}
          rules={{ required: "Wajib diisi" }}
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              onChange={onChange}
              label="Nama Aplikasi"
              placeholder="Masukan Nama Aplikasi"
            />
          )}
        />
        {errors.name?.message && (
          <p className="text-sm text-red-500 -mt-3">{errors.name.message}</p>
        )}
        <Controller
          name="warning.title"
          control={appFormControl}
          rules={{ required: "Wajib diisi" }}
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              onChange={onChange}
              label="Judul Peringatan"
              placeholder="Judul peringatan asuransi"
            />
          )}
        />
        {errors.warning?.title?.message && (
          <p className="text-sm text-red-500 -mt-3">
            {errors.warning.title.message}
          </p>
        )}
        <Controller
          name="warning.description"
          control={appFormControl}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <InputArea
              value={value}
              onChange={onChange}
              label="Data Peringatan Asuransi"
              placeholder="...."
            />
          )}
        />
        {errors.warning?.description?.message && (
          <p className="text-sm text-red-500 -mt-3">
            {errors.warning.description.message}
          </p>
        )}
        <Controller
          name="announcement"
          control={appFormControl}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <InputArea
              value={value}
              onChange={onChange}
              label="Pengumuman"
              placeholder="...."
            />
          )}
        />
        {errors.announcement?.message && (
          <p className="text-sm text-red-500 -mt-3">
            {errors.announcement.message}
          </p>
        )}
        <button
          type="submit"
          className="active:opacity-40 transition duration-300 ease-in-out uppercase w-full py-3 text-lg mb-4 rounded-full bg-green-500 text-white hover:bg-green-600 text-center ubuntu-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormApp;
