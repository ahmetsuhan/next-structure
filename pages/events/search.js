import Layout from "../../layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
import { useRouter } from "next/router";
import Link from "next/link";

import qs from "qs";
export default function SearchPage({ events }) {
  //console.log(events);
  const router = useRouter();
  return (
    <Layout title="Search Results">
      <Link href="/events">Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((event) => {
        return <EventItem key={event.id} event={event} />;
      })}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  });

  const res = await fetch(`${API_URL}events?${query}`);
  const events = await res.json();
  //console.log(events);
  return {
    props: {
      events: events,
    },
  };
}
