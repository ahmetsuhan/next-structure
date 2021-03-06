import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../../layout";
import { parseCookies } from "@/helpers/index";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";
import { FaImage } from "react-icons/fa";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";

export default function EditEventPage({ event, token }) {
  const [values, setValues] = useState({
    name: event.name,
    performers: event.performers,
    venue: event.venue,
    address: event.address,
    date: event.date,
    time: event.time,
    description: event.description,
  });

  const [imagePreview, setImagePreview] = useState(
    event.image ? event.image.formats.thumbnail.url : null
  );

  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //console.log(values);
    //Validation
    const hasEmptyField = Object.values(values).some(
      (element) => element === ""
    );
    if (hasEmptyField) {
      //console.log("Please fill in all fields");
      toast.error("Please fill in all fields");
    }
    const res = await fetch(`${API_URL}events/${event.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error("Unauthorized");
        return;
      }
      toast.error("Something Went Wrong");
    } else {
      const evt = await res.json();
      router.push(`/events/${evt.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async (e) => {
    //console.log("uploaded");

    const res = await fetch(`${API_URL}events/${event.id}`);
    const data = await res.json();
    setImagePreview(data.image.formats.thumbnail.url);
    setShowModal(false);
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">Go Back</Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="performers">Event Performers</label>
            <input
              type="text"
              id="performers"
              name="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="venue">Event Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="address">Event Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="date">Event Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={moment(values.date).format("yyyy-MM-DD")}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="time">Event Time</label>
            <input
              type="text"
              id="time"
              name="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <input type="submit" value="Update Event" className="btn" />
      </form>

      <h2>Event Image</h2>
      {imagePreview ? (
        <img src={imagePreview} alt="" width={170} height={100} />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}

      <div>
        <button onClick={() => setShowModal(true)} className="btn-secondary">
          <FaImage /> Set Image
        </button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload
          eventId={event.id}
          imageUploaded={imageUploaded}
          token={token}
        />
      </Modal>
    </Layout>
  );
}

export async function getServerSideprops({ params: { id }, req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}events/${id}`);

  const data = await res.json();

  //console.log(req.headers.cookie);

  return {
    props: {
      event: data,
      token,
    },
  };
}
