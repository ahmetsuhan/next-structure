import Layout from "../../layout";
import { API_URL, PER_PAGE } from "@/config/index";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";

export default function EventsPage({ events, total, page }) {
  console.log(events);

  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((event) => {
        return <EventItem key={event.id} event={event} />;
      })}

      <Pagination page={page} total={total} />
    </Layout>
  );
}

// export async function getStaticProps() {
//   const res = await fetch(`${API_URL}events?_sort=date:ASC`);
//   const events = await res.json();
//   //console.log(events);
//   return {
//     props: {
//       events: events.slice(0, 3),
//     },
//     revalidate: 1,
//   };
// }

export async function getServerSideProps({ query: { page = 1 } }) {
  //console.log(page);

  //Calculate start page
  const start = parseInt(page) === 1 ? 0 : (parseInt(page) - 1) * PER_PAGE;

  //fetch total/count
  const totalRes = await fetch(`${API_URL}events/count`);
  const total = await totalRes.json();

  //Fetch events
  const eventRes = await fetch(
    `${API_URL}events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await eventRes.json();
  //console.log(events);

  return {
    props: {
      events: events,
      page: +page,
      total,
    },
  };
}
