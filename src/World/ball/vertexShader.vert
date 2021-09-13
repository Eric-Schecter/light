uniform float uTime;

out vec2 vUv;
out vec3 vPos;
out vec3 vWPos;
out vec3 vNormal;

#include<snoise.glsl>;

void main(){
  vUv=uv;
  vec3 pos=position;
  float d=snoise(vec4(pos/2.,uTime/3.));
  float ratio=d/2.;
  vNormal=(modelMatrix * vec4(normal,1.)).xyz;
  pos.x+=vNormal.x*ratio;
  pos.y+=vNormal.y*ratio;
  pos.z+=vNormal.z*ratio;
  vPos=pos;
  vec4 wPos=modelMatrix*vec4(pos,1.);
  vWPos=wPos.xyz;
  gl_Position=projectionMatrix*viewMatrix*wPos;
}
