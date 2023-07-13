import React from "react";
import EditStudent from "../../components/edit-student.component";

const EditStudentPage = () => {
  return <EditStudent />;
};

// UNABLE TO USE THE FOLLOWING CODE WITH FIREBASE FREE TIER

// export async function getStaticProps(context) {
//   const { id } = context.params;

//   return {
//     props: {
//       id,
//     },
//   };
// }

// export async function getStaticPaths() {
//   // This function can be used to specify the dynamic routes that should be generated at build time.
//   // For example, you can fetch a list of IDs from an external API and generate a route for each ID.
//   // In this case, since we're using a dynamic route with a single ID parameter, we'll just return an empty array.
//   return { paths: [], fallback: true };
// }

export default EditStudentPage;
