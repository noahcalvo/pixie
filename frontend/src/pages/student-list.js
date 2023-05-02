import dynamic from "next/dynamic";

const StudentList = dynamic(
  () => import("../components/student-list.component"),
  {
    ssr: false,
  }
);

function StudentListPage() {
  return <StudentList />;
}

export default StudentListPage;
