uniform vec3 uMouse;
uniform vec3 uColor;

in vec3 vWPos;
in vec3 vNormal;

#include <diffusion.glsl>;

void main()
{
    vec3 lightDirection=normalize(uMouse-vWPos);
    float diffusion=getDiffusion(uMouse,vNormal,vWPos);
    gl_FragColor=vec4(uColor*diffusion,1.);
}