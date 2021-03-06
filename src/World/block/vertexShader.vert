out vec3 vWPos;
out vec3 vNormal;

void main(){
  vec4 wPos = modelMatrix*vec4(position,1.);
  vWPos = wPos.xyz;
  vNormal = (modelMatrix * vec4(normal,1.)).xyz;
  gl_Position=projectionMatrix*viewMatrix*wPos;
}
