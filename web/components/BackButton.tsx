import { useRouter } from "next/router";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      className="bg-white dark:bg-gray-800 text-slate-700 dark:text-white text-3xl w-48 h-16 border-[6px] border-slate-700 dark:border-gray-500 rounded-xl mb-4 ml-32 transition-all duration-300 hover:scale-105"
      type="button"
      onClick={() => router.back()}
    >
      Back
    </button>
  );
}
