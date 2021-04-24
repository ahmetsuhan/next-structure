import Layout from "../../layout";
import { parseCookies } from "@helpers/index";
import { API_URL } from "@/config/index";
import styles from "@/styles/Dashboard.module.css";
import DasboardEvent from "@/components/DashboardEvent";
import { useRouter } from "next/router";

export default function DashboardPage({ events, token }) {
  //console.log(events);

  const router = useRouter();

  const deleteEvent = async (id) => {
    //console.log("delete");
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push("/events");
      }
    }
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
      token,
    },
  };
}
