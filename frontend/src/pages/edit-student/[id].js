import React from "react";
import EditStudent from "../../Components/edit-student.component";

const EditStudentPage = ({ id }) => {
  return <EditStudent id={id} />;
};

export async function getServerSideProps(context) {
  const { id } = context.query;

  return {
    props: {
      id,
    },
  };
}

export default EditStudentPage;
