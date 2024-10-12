import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/evento.png"
        alt="EVENTO logo"
        width={53}
        height={12}
      />
    </Link>
  );
}
