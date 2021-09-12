uniform float uTime;

out vec2 vUv;
out vec3 vPos;
out vec4 vWPos;
out vec3 vNormal;

#include<snoise.glsl>;

void main(){
  vUv=uv;
  vec3 pos=position;
  float d=snoise(vec4(pos/2.,uTime/3.));
  float ratio=d/2.;
  pos.x+=normal.x*ratio;
  pos.y+=normal.y*ratio;
  pos.z+=normal.z*ratio;
  vPos = pos;
  vWPos = modelMatrix*vec4(pos,1.);
  vNormal = normal;
  gl_Position=projectionMatrix*viewMatrix*vWPos;
}
