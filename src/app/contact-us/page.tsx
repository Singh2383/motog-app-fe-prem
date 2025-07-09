import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <section className="relative min-h-9/12 bg-[url('/images/cu4.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/60 z-0" />
      <form className="relative z-10 pt-48 pb-32 px-4 w-full sm:w-1/2 mx-auto" action={"mailto:wandcorppvtltd@gmail.com"} method="POST">
        <div className="mb-4">
          <label
            htmlFor="fname"
            className="block text-gray-100 font-semibold text-lg"
          >
            First Name
          </label>
          <Input
            id="fname"
            name="firstname"
            placeholder="Your first name.."
            className="mt-2 text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="lname"
            className="block text-gray-100 font-semibold text-lg"
          >
            Last Name
          </label>
          <Input
            id="lname"
            name="lastname"
            placeholder="Your last name.."
            className="mt-2 text-white"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="subject"
            className="block text-gray-100 font-semibold text-lg"
          >
            Subject
          </label>
          <Textarea
            id="subject"
            name="subject"
            placeholder="Write something.."
            className="mt-2 h-20 text-white"
            required
          />
        </div>

        <Button type="submit" className="text-lg px-6 py-3 bg-sky-500 hover:bg-sky-700">
          Submit
        </Button>
      </form>
    </section>
  );
}
