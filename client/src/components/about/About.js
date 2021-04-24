import img from "../../img/saw.jpg";

const About = () => {
	document.querySelector('body').style.backgroundImage = "url(" + img+")"
	return (
		<section className="about">
				<h1>Birdy</h1>
				<p>
						Projet réalisé dans le cadre de l'unité d'enseignement LU3I017 - TECHNOLOGIES DU WEB à Sorbonne Université<br></br>
						Par:<br></br>
				</p>
				<ul>
						<li>Chems Eddine BENSAFIA</li>
						<li>Anes BOUZOUAOUI</li>
				</ul>
				<br></br><br></br>
				<small><i>Groupe 3 - Jeudi <b>@2021</b></i></small>
		</section>
	)
}

export default About