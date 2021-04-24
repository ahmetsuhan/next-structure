import Layout from "../../layout";
import { parseCookies } from "@helpers/index";
import { API_URL } from "@/config/index";
import styles from "@/styles/Dashboard.module.css";
import DasboardEvent from "@/components/DashboardEvent";

export default function DashboardPage({ events }) {
  //console.log(events);

  const deleteEvent = (id) => {
    console.log(id);
  };
  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {events.map((evt) => {
          return (
            <DasboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent}>
              {evt.name}
            </DasboardEvent>
          );
        })}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  //console.log(token)

  const res = await fetch(`${API_URL}events/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  const events = await res.json();

  return {
    props: {
      events,
    },
  };
}
