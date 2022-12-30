import {AdvancedImage} from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen'
import {thumbnail} from "@cloudinary/url-gen/actions/resize"



const myCld = new Cloudinary({
  cloud: {
    cloudName: "dnv2xywfm",
  },
});




export default function Poster ({file}) {
  let img = myCld.image(`poster/${file}.jpg`)
  img.resize(thumbnail().width(50).height(75))

  return (
    <AdvancedImage cldImg={img}></AdvancedImage>
  )
}