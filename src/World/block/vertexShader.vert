out vec3 vPos;
out vec4 vWPos;
out vec3 vNormal;

void main(){
  vPos = position;
  vWPos = modelMatrix*vec4(position,1.);
  vNormal = normal;
  gl_Position=projectionMatrix*viewMatrix*vWPos;
}
