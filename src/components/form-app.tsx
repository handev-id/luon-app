import { AppModel } from "../models/costumer";
import Input from "./form/input";
import { Controller, useForm } from "react-hook-form";
import InputArea from "./form/input-area";

const FormApp = () => {
  const { control: appFormControl } = useForm<AppModel>();

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mt-5 border border-green-200">
      <p className="font-bold text-xl text-green-900 text-center mb-4">
        Isi Data Aplikasi
      </p>

      <form className="flex flex-col gap-4">
        <Controller
          name="appName"
          control={appFormControl}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              onChange={onChange}
              label="Nama Aplikasi"
              placeholder="Masukan Nama Aplikasi"
            />
          )}
        />
        <Controller
          name="appWarning"
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
      </form>
    </div>
  );
};

export default FormApp;
