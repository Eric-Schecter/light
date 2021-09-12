struct PointLight{
    vec3 color;
    vec3 position;
    float distance;
};

uniform sampler2D uTexture;
uniform float uTime;
uniform vec3 uMouse;
uniform float lightIntensity;
uniform PointLight pointLights[NUM_POINT_LIGHTS];

in vec2 vUv;
in vec3 vPos;
in vec4 vWPos;
in vec3 vNormal;

void main()
{
    // vec4 texture=texture2D(uTexture,vUv);
    // vec4 addedLights=vec4(0.,0.,0.,1.);
    // for(int i=0;i<NUM_POINT_LIGHTS;i++){
        //     PointLight pointLight=pointLights[i];
        //     vec3 lightDirection=normalize(vPos-pointLight.position);
        //     addedLights.rgb+=clamp(dot(-lightDirection,vNormal),0.,1.)*pointLight.color*lightIntensity;
    // }
    // gl_FragColor=texture*addedLights;
    vec4 texture=texture2D(uTexture,vUv);
    vec3 lightDirection=normalize(uMouse-vWPos.xyz);
    float diffusion=max(0.,dot(vNormal,lightDirection));
    gl_FragColor=vec4(texture*diffusion);
}