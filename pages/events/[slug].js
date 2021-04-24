import Layout from "../../layout";
import { API_URL } from "@/config/index";

export default function EventPage({ event }) {
  return (
    <Layout>
      <h1>{event.name}</h1>
    </Layout>
  );
}
export async function getStaticPaths() {
  const res = await fetch(`${API_URL}api/events`);
  const events = await res.json();

  const paths = events.map((evt) => ({
    params: { slug: evt.slug },
  }));

  return {
    paths: paths,
    fallback: true,
  };
}
export async function getStaticProps({ params: { slug } }) {
  //console.log(slug);

  const res = await fetch(`${API_URL}api/events/${slug}`);
  const events = await res.json();
  return {
    props: {
      event: events[0],
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps({ query: { slug } }) {
//   //console.log(slug);

//   const res = await fetch(`${API_URL}api/events/${slug}`);
//   const events = res.json();
//   return {
//     props: {
//       event: events[0],
//     },
//   };
// }
