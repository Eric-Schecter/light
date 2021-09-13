float getDiffusion(vec3 mouse,vec3 normal,vec3 pos){
  vec3 lightDirection=normalize(mouse-pos);
  float angle=dot(normal,lightDirection);
  return clamp(pow(angle,.5),.1,1.);
}