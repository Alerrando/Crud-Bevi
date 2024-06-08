import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import styles from "./input.module.scss";

type InputProps = {
  register: UseFormRegister<{
    name: string;
    description: string;
    price: number;
    stock_quantity: number;
    status?: string | null | undefined;
  }>;
  error: FieldErrors<{
    name: string;
    description: string;
    price: number;
    stock_quantity: number;
    status?: string | null | undefined;
  }>;
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
      <div className={styles["form-input"]}>
        <label htmlFor={name}>{title}</label>
        <input type={type} {...register(name)} placeholder={placeholder} />
        {error[name] && <span className={styles["error-input"]}>{error[name]?.message}</span>}
      </div>

      {select && (
        <div className={styles["form-input"]}>
          <label htmlFor={name}>{title}</label>
          <select {...register(name)} onChange={(e) => handleChangeStatus && handleChangeStatus(e)}>
            <option value={1}>Em Estoque</option>
            <option value={2}>Em Reposição</option>
            <option value={3}>Em Falta</option>
          </select>

          {error[name] && <span className={styles["error-input"]}>{error[name]?.message}</span>}
        </div>
      )}
    </>
  );
}
