import React from 'react'
import {AdvancedVideo} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

// Import required actions and qualifiers.
import {fill} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";
import {Gravity} from "@cloudinary/url-gen/qualifiers";
import {AutoFocus} from "@cloudinary/url-gen/qualifiers/autoFocus";

const VideoFile = ({file, isHidden=false}) => {

  // Create and configure your Cloudinary instance.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dnv2xywfm',
    },
  }); 

  if(!file){
    return null
  }

  // Use the video with public ID, 'docs/walking_talking'.
  const myVideo = cld.video(`clips/${file}`);
  console.log(myVideo)
  // myVideo.

  // Apply the transformation.
  myVideo.resize(fill().width(267))
//   .gravity(Gravity.autoGravity().autoFocus(AutoFocus.focusOn(FocusOn.faces())))) // Crop the video, focusing on the faces.
//   .roundCorners(byRadius(20));    // Round the corners.

  // Render the transformed video in a React component.
  return (
    <div class="movie-clip" style={{display: isHidden ? 'none' : 'block'}}>
      <AdvancedVideo autoPlay cldVid={myVideo} onError={(err) => {console.log('video error', err)}}/>
    </div>
  )
};

export default React.memo(VideoFile)