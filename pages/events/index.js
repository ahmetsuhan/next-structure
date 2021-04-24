import Layout from "../../layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
export default function EventsPage({ events }) {
  console.log(events);

  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((event) => {
        return <EventItem key={event.id} event={event} />;
      })}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}api/events`);
  const events = await res.json();
  //console.log(events);
  return {
    props: {
      events: events.slice(0, 3),
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps() {
//   const res = await fetch(`${API_URL}api/events`);
//   const events = await res.json();
//   //console.log(events);
//   return {
//     props: {
//       events: events,
//     },
//     revalidate: 1,
//   };
// }
