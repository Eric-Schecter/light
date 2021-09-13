uniform sampler2D uTexture;
uniform float uTime;
uniform vec3 uMouse;

in vec2 vUv;
in vec3 vPos;
in vec3 vWPos;
in vec3 vNormal;

#include<diffusion.glsl>;

void main()
{
    vec4 texture=texture2D(uTexture,vUv);
    float diffusion=getDiffusion(uMouse,vNormal,vWPos);
    gl_FragColor=vec4(texture*diffusion);
}