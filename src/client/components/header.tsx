import { Heading } from "@/client/components/heading";
import { Link } from "@/client/components/link";
import { Flex } from "@/client/components/flex";
import { ButtonHandleSidemenu } from "@/client/components/button-handle-sidemenu";
import Image from "next/image";

/**
 * Header component for the Live Transcription App.
 *
 * Renders the global header with a logo, breadcrumb navigation, and a button to handle the side menu.
 *
 * @module components/global/Header
 * @param {Object} props - The component props.
 * @param {Object[]} [props.breadcrumbItems] - The breadcrumb items to display.
 * @returns {JSX.Element} The rendered header component.
 */
export const Header = () => {
  return (
    <div className="sticky top-0 flex justify-between items-center py-4">
      <Flex gap="small" align="center" justify="center">
        <Link href="/" isNoUnderline>
          <Heading as="h1">
            <Image src="/logo.svg" alt="logo" width={98} height={18} />
          </Heading>
        </Link>
      </Flex>

      <div className="flex items-center gap-2">
        <ButtonHandleSidemenu />
      </div>
    </div>
  );
};
