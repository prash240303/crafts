import React from 'react'
import { BanIcon, Check, CircleDashed, Columns2, DotIcon, Download, Eye, Play, PlayIcon, Upload } from "lucide-react";
import TagsComponent from '@/components/TagsComponent'
type Props = {}

const page = (props: Props) => {
  return (
    <div className="flex min-h-screen  items-center justify-center gap-4 p-24"> <TagsComponent
      type="default"
      content="Verified"
      isFilled={true}
      isBordered={false}
      trailingIcon={null}
      leadingIcon={<Check />}
      color="Success"
      colorType="light"
    />
      <TagsComponent
        type="default"
        content="Rejected"
        isFilled={true}
        isBordered={false}
        trailingIcon={null}
        leadingIcon={<BanIcon />}
        color="Danger"
        colorType="light"
      />
      <TagsComponent
        type="default"
        content="Incomplete"
        isFilled={true}
        isBordered={false}
        trailingIcon={null}
        leadingIcon={<CircleDashed />}
        color="Warning"
        colorType="light"
      />
      <TagsComponent
        type="default"
        content="Uploaded"
        isFilled={true}
        isBordered={false}
        trailingIcon={null}
        leadingIcon={null}
        color="Teal"
        colorType="light"
      />
      <TagsComponent
        type="default"
        content="Booking"
        isFilled={true}
        isBordered={false}
        trailingIcon={null}
        leadingIcon={null}
        color="Info"
        colorType="light"
      />
      <TagsComponent
        type="default"
        content="Not recived"
        isFilled={true}
        isBordered={false}
        trailingIcon={null}
        leadingIcon={<Columns2 />}
        color="Default"
        colorType="light"
      />
      <TagsComponent
        type="default"
        content="Download"
        isFilled={true}
        isBordered={false}
        trailingIcon={null}
        leadingIcon={<Download />}
        colorType="solid"
        color="Purple"
      />
      <TagsComponent
        type="default"
        content="Upload"
        isFilled={true}
        isBordered={false}
        trailingIcon={null}
        leadingIcon={<Upload />}
        colorType="solid"
        color="Purple"
      />

      <TagsComponent
        type="default"
        content="view"
        isFilled={true}
        isBordered={false}
        trailingIcon={<Eye/>}
        leadingIcon={null}
        colorType="solid"
        color="Purple"
      />
      </div>
  )
}

export default page