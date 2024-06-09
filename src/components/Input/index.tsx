import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import styles from "./input.module.scss";

type Fields = {
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  status?: string | null | undefined;
};

type InputProps = {
  register: UseFormRegister<Fields>;
  error: FieldErrors<Fields>;
  select: boolean;
  handleChangeStatus?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
} & React.ComponentProps<"input">;

export function Input({
  name,
  placeholder,
  register,
  error,
  type,
  title,
  select = false,
  handleChangeStatus,
}: InputProps) {
  return (
    <>
      {!select && (
        <div className={styles["form-input"]}>
          <label htmlFor={name}>{title}</label>
          <input type={type} {...register(name as keyof Fields)} placeholder={placeholder} />
          {error[name as keyof Fields] && (
            <span className={styles["error-input"]}>{error[name as keyof Fields]?.message}</span>
          )}
        </div>
      )}

      {select && (
        <div className={styles["form-input"]}>
          <label htmlFor={name}>{title}</label>
          <select
            {...register(name as keyof Fields)}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChangeStatus && handleChangeStatus(e)}
          >
            <option value={1}>Em Estoque</option>
            <option value={2}>Em Reposição</option>
            <option value={3}>Em Falta</option>
          </select>

          {error[name as keyof Fields] && (
            <span className={styles["error-input"]}>{error[name as keyof Fields]?.message}</span>
          )}
        </div>
      )}
    </>
  );
}
