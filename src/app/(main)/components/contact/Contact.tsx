import Container from "@/components/layout/Container";
import Title from "@/components/layout/Title";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

const Contact = () => {
  return (
    <div id="contact" className="lg:py-14 md:py-10 py-7">
      <Container>
        <Title title="Hire Me" />
        <div className="lg:flex md:flex lg:mt-10 mt-6 justify-center items-start">
          <ContactInfo />
          <ContactForm />
        </div>
      </Container>
    </div>
  );
};

export default Contact;
