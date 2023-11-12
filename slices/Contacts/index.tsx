import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import { useReadySlice } from '@/lib/hooks/useReadySlice';

import { ContactInfoSection } from '@/ui/contact/ContactInfoSection';

import { SliceZoneContext } from '@/types';

/**
 * Props for `ContactsBlock`.
 */
export type ContactsBlockProps = SliceComponentProps<
  Content.ContactsBlockSlice,
  SliceZoneContext
>;

/**
 * Component for "ContactsBlock" Slices.
 */
function ContactsBlock({ slice, context }: ContactsBlockProps): JSX.Element {
  useReadySlice();

  return (
    <ContactInfoSection
      title={slice.primary.title as string}
      imageData={slice.primary.avatar}
      contactEmail={context.contactEmail}
      socialLinks={context.socialLinks}
    />
  );
}

export default ContactsBlock;
