import { FormEvent, useRef, useState } from "react";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  age: z
    .number({ invalid_type_error: "Age field is required" })
    .min(18, { message: "Age must be at least 18" }),
});

type FormData = z.infer<typeof schema>;

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = (data: FieldValues) => console.log(data);

  //2. useState instead of useRef:

  // const [person, setPerson] = useState({
  //   name: "",
  //   age: 0,
  // });

  // 1. useRef hook to reference the input fields
  // const nameRef = useRef<HTMLInputElement>(null);
  // const ageRef = useRef<HTMLInputElement>(null);
  // // create an object to send to server to be saved on submission

  // const person = {
  //   name: "",
  //   age: 0,
  // };

  // const handleSubmit = (e: FormEvent) => {
  //   e.preventDefault();
  //   // if (nameRef.current !== null) person.name = nameRef.current.value;
  //   // if (ageRef.current !== null) person.age = parseInt(ageRef.current.value);
  // };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          className="form-control"
        />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          {...register("age", { valueAsNumber: true })}
          id="age"
          type="number"
          className="form-control"
        />
        {errors.age && <p className="text-danger">{errors.age.message}</p>}
      </div>
      <button className="btn btn-primary" type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};
