import SignupForm from "@/components/ui/form/signup-form";

export default function Page() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-full md:w-3/4 lg:w-1/2 max-w-[46rem] bg-white rounded-md border shadow px-2 md:px-4 py-4">
        <h3 className="font-bold text-2xl lg:text-3xl mb-4 w-full text-center">
          Add Supplier
        </h3>
        <SignupForm />
      </div>
    </div>
  );
}
