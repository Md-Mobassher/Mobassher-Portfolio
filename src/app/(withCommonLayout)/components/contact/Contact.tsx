import Container from "@/components/ui/Container";
import Title from "@/components/ui/Title";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <div id="contact" className="lg:mt-28 md:mt-20 mt-14 ">
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
