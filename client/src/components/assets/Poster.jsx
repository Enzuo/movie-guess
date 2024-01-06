import * as React from 'react'
import {AdvancedImage} from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen'
import {thumbnail} from "@cloudinary/url-gen/actions/resize"



const myCld = new Cloudinary({
  cloud: {
    cloudName: "dnv2xywfm",
  },
});




function Poster ({file}) {
  const height = 200
  const width = 133
  let img = myCld.image(`poster/${file}.jpg`)
  img.resize(thumbnail().width(width).height(height))

  return (
    <div style={{height:height+'px', width:width+'px', flexShrink: 0}}>
      <AdvancedImage cldImg={img}></AdvancedImage>
    </div>
  )
}

export default Poster