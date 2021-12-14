import React, { Suspense, Component } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model(props) {
	const { scene } = useGLTF(`/3d/${props.filename}.gltf`);
	return <primitive object={scene} position={[0,-0.4,0]} />;
}

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