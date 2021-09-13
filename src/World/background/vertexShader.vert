out vec3 vPos;
out vec3 vWPos;
out vec3 vNormal;

void main(){
  vPos=position;
  vec4 wPos=modelMatrix*vec4(vPos,1.);
  vWPos=wPos.xyz;
  // vNormal=(modelMatrix*vec4(normal,1.)).xyz;
  // vNormal=vec3(0.,0.,1.);
  gl_Position=projectionMatrix*viewMatrix*wPos;
}
