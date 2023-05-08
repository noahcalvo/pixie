import dynamic from "next/dynamic";

const CreateStudent = dynamic(
  () => import("../components/create-student.component"),
  {
    ssr: false,
  }
);

function CreateStudentPage() {
  return <CreateStudent />;
}

export default CreateStudentPage;
