uniform sampler2D uTexture;
uniform float uTime;
uniform vec3 uMouse;

in vec2 vUv;
in vec3 vPos;
in vec3 vWPos;
in vec3 vNormal;

void main()
{
    vec4 texture=texture2D(uTexture,vUv);
    vec3 lightDirection=normalize(uMouse-vWPos);
    float diffusion=max(0.,dot(vNormal,lightDirection));
    gl_FragColor=vec4(texture*diffusion);
}