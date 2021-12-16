import React, { Suspense, Component } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// 3d Model viewer component

function Model(props) {
	const { scene } = useGLTF(`/3d/${props.filename}.gltf`); // load the relevant model into the scene object
	return <primitive object={scene} position={[0,-0.4,0]} />; // place the object just below 0,0,0 so it's centred in the viewport
}

// Create a point light for the scene
function KeyLight() { 
	return (
	  <pointLight
		width={3}
		height={3}
		color={"white"}
		intensity={1}
		position={[-2, 0, 5]}
		lookAt={[0, 0, 0]}
		penumbra={1}
		castShadow
	  />
	);
  }

// body of viewer component, contains canvas with camera, an ambient light, a point light, model (in suspense component) and orbital controls
export class Viewer extends Component {
	render() {
		return (
			<Canvas pixelRatio={[1, 2]} camera={{ position: [0, 0, 6], fov: 16 }}>
				<ambientLight intensity={0.3} />
				<KeyLight />
				<Suspense fallback={null}>
					{this.props.model !== "" &&
						<Model filename={this.props.model} />
					}
				</Suspense>
				<OrbitControls />
			</Canvas>
		);
	}
}