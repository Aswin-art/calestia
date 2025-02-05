import React, { Fragment } from "react";
import { SplineScene } from "@/components/ui/splite";

export default function AboutUs() {
  return (
    <Fragment>
      <section>
        <div className="container relative mx-auto h-screen w-full overflow-hidden">
          <div className="flex h-full flex-col lg:flex-row">
            {/* Left content */}
            <div className="relative z-10 flex flex-1 basis-full flex-col justify-center p-8 lg:basis-2/5">
              <h2 className="bg-linear-to-b from-neutral-50 to-neutral-400 bg-clip-text text-3xl font-bold text-transparent md:text-5xl lg:text-4xl">
                About Us
              </h2>
              <p className="mt-4 max-w-lg text-neutral-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Provident vero veniam unde rerum, dolorum deleniti pariatur
                porro in voluptatum? Recusandae assumenda dignissimos asperiores
                magnam. Qui sit minima cum quia aperiam.
              </p>
            </div>

            {/* Right content */}
            <div className="relative h-[500px] flex-1 basis-full lg:h-full lg:basis-3/5">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
