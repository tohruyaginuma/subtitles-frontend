import { Contents } from "@/client/components/contents";
import { Header } from "@/client/components/header";
import { Spinner } from "@/client/components/spinner";

export default function Loading() {
  return (
    <>
      <Header />
      <Contents>
        <div className="flex justify-center items-center h-full w-full">
          <Spinner />
        </div>
      </Contents>
    </>
  );
}
